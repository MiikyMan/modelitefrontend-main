'use client';
import { customizeRequiredMark } from '@/components/customReuiredMark';
import ProductImageCroper from '@/components/seller/product/ProductImageCroper';
import ProductMultiImageCroper from '@/components/seller/product/ProductMultiImageCroper';
import { ICreateProduct, ICreateProductOption } from '@/interfaces/product';
import { CreateProductAPI } from '@/api/product';
import { Button, Form, Input, Select } from 'antd';
import Link from 'next/link';
import React from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Swal from 'sweetalert2';

interface CreateProductProps {
  sellerId: string;
  categoryOption: {
    label: string;
    value: number;
  }[];
  brandOption: {
    label: string;
    value: number;
  }[];
  sizeOption: {
    label: string;
    value: string;
  }[];
}

function CreateProduct(props: CreateProductProps) {
  const [form] = Form.useForm();
  const onFinish = async () => {
    try {
      const data = form.getFieldsValue();
      const body: ICreateProduct = {
        sellerId: props.sellerId,
        name: data.name,
        description: data.description,
        feature: JSON.stringify(data.feature),
        imageUrl: data.imageUrl,
        price: Number(data.price),
        productOption: data.productOption.map((item: ICreateProductOption) => {
          return {
            imageUrl: JSON.stringify(item.imageUrl),
            label: item.label,
            productSize: item.productSize.map((size) => {
              return {
                sizeId: size.sizeId,
                quantity: Number(size.quantity),
              };
            }),
          };
        }),
        tagId: [Number(data.categories_tag_id), Number(data.brand_tag_id)],
      };
      const response = await CreateProductAPI(body);
      if (response) {
        Swal.fire({
          title: 'Success!',
          text: 'Create product success',
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then(() => {
          window.location.replace(`/seller/${props.sellerId}/my-product`);
        });
      }
    } catch {
      Swal.fire({
        title: 'Error!',
        text: 'Create product fail',
        icon: 'error',
        confirmButtonText: 'Ok',
      }).then(() => {
        window.location.reload();
      });
    }
  };

  const filterSize = (
    sizeSelected: string[]
  ): {
    label: string;
    value: string;
    disabled: boolean;
  }[] => {
    return props.sizeOption.map((item) => {
      if (sizeSelected.includes(item.value)) {
        return {
          label: item.label,
          value: item.value,
          disabled: true,
        };
      } else {
        return {
          label: item.label,
          value: item.value,
          disabled: false,
        };
      }
    });
  };

  return (
    <Form
      form={form}
      layout='vertical'
      className='w-full space-y-4'
      scrollToFirstError
      requiredMark={customizeRequiredMark}
      onFinish={onFinish}
      initialValues={{
        name: '',
        description: '',
        imageUrl: '',
        price: 0,
        feature: [''],
        productOption: [
          {
            imageUrl: [],
            label: '',
            productSize: [
              {
                sizeId: '',
                quantity: 0,
              },
            ],
          },
        ],
      }}
    >
      <div className='w-full gap-y-6 rounded-2xl border'>
        <div className='flex justify-between px-6 py-4'>
          <h1 className='text-2xl font-semibold'>Basic information</h1>
          <Link href={`/seller/${props.sellerId}/my-product`} className='content-center text-lg text-purple1'>
            Back
          </Link>
        </div>
        <hr />
        <div className='px-6 py-4'>
          <div className='grid grid-cols-2 gap-x-4'>
            <Form.Item
              name='name'
              label={<p className='text-bold text-lg'>Product Name</p>}
              rules={[
                {
                  required: true,
                  message: 'Please input product name!',
                },
              ]}
            >
              <Input size='large' placeholder='Product Name' />
            </Form.Item>
            <Form.Item
              name='price'
              label={<p className='text-bold text-lg'>Price</p>}
              validateFirst
              rules={[
                {
                  required: true,
                  message: 'Please input price!',
                },
                {
                  validator(_, value) {
                    if (value <= 0) {
                      return Promise.reject('Price must be greater than 0');
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input size='large' type='number' className='[&::-webkit-inner-spin-button]:appearance-none' placeholder='Price' />
            </Form.Item>
          </div>
          <div className='grid grid-cols-2 gap-x-4'>
            <Form.Item
              name='categories_tag_id'
              label={<p className='text-bold text-lg'>Categories</p>}
              rules={[
                {
                  required: true,
                  message: 'Please input categories!',
                },
              ]}
            >
              <Select size='large' labelRender={(label) => <p className='text-lg'>{label.label}</p>} placeholder='Categories' options={props.categoryOption} />
            </Form.Item>
            <Form.Item
              name='brand_tag_id'
              label={<p className='text-bold text-lg'>Brand</p>}
              rules={[
                {
                  required: true,
                  message: 'Please input brand!',
                },
              ]}
            >
              <Select size='large' labelRender={(label) => <p className='text-lg'>{label.label}</p>} placeholder='Brand' options={props.brandOption} />
            </Form.Item>
          </div>
          <div>
            <Form.List name='feature'>
              {(fields, { add, remove }) => (
                <div>
                  <p className='text-bold py-1 text-lg'>Feature</p>
                  {fields.map((field, index) => (
                    <div key={`feature-${field.name}-${field.key}-${index}`}>
                      <Form.Item
                        {...field}
                        name={[field.name]}
                        rules={[
                          {
                            required: true,
                            message: 'Please input feature!',
                          },
                        ]}
                      >
                        <div className='flex w-full gap-x-2'>
                          <Input size='large' placeholder='Feature' />
                          <Button
                            htmlType='button'
                            size='large'
                            onClick={() => {
                              remove(field.name);
                            }}
                            disabled={fields.length === 1}
                          >
                            <RiDeleteBin6Line />
                          </Button>
                          <Button
                            htmlType='button'
                            size='large'
                            onClick={() => {
                              add();
                            }}
                          >
                            +
                          </Button>
                        </div>
                      </Form.Item>
                    </div>
                  ))}
                </div>
              )}
            </Form.List>
            <Form.Item
              name='description'
              label={<p className='text-bold text-lg'>Description</p>}
              rules={[
                {
                  required: true,
                  message: 'Please input description!',
                },
              ]}
            >
              <Input size='large' placeholder='Description' />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              name='imageUrl'
              label={<p className='text-bold text-lg'>Product image</p>}
              rules={[
                {
                  required: true,
                  message: 'Please input image!',
                },
              ]}
            >
              <ProductImageCroper
                ImageURL={form.getFieldValue('imageUrl') || ''}
                onChange={(url: string) => {
                  form.setFieldsValue({ imageUrl: url });
                }}
              />
            </Form.Item>
          </div>
        </div>
      </div>
      <Form.List name='productOption'>
        {(fields, { add, remove }) => (
          <div className='w-full gap-y-6 rounded-2xl border'>
            <div className='flex justify-between px-6 py-4'>
              <h1 className='text-2xl font-semibold'>Product detail</h1>
              <button
                type='button'
                onClick={() => {
                  add({
                    imageUrl: [],
                    label: '',
                    productSize: [{ sizeId: '', quantity: '' }],
                  });
                }}
                className='content-center text-lg text-purple1'
              >
                Add color
              </button>
            </div>
            <hr />
            <div className='px-6 py-4'>
              <div className='flex flex-col gap-y-8'>
                {fields.map((field) => (
                  <div key={`productOption-${field.name}-${field.key}`}>
                    <div className='flex w-full gap-x-4'>
                      <Form.Item
                        name={[field.name, 'label']}
                        label={<p className='text-bold text-lg'>Color</p>}
                        className='w-full'
                        rules={[
                          {
                            required: true,
                            message: 'Please input color!',
                          },
                        ]}
                      >
                        <div className='flex w-full gap-x-2'>
                          <Input size='large' placeholder='Color' />
                          <Button
                            htmlType='button'
                            size='large'
                            onClick={() => {
                              remove(field.key);
                            }}
                            disabled={fields.length === 1}
                          >
                            <RiDeleteBin6Line />
                          </Button>
                        </div>
                      </Form.Item>
                    </div>
                    <div>
                      <Form.Item
                        name={[field.name, 'imageUrl']}
                        label={<p className='text-bold text-lg'>Product image</p>}
                        rules={[
                          {
                            required: true,
                            message: 'Please input image!',
                          },
                        ]}
                      >
                        <ProductMultiImageCroper
                          ImageURL={form.getFieldValue(['productOption', field.name]).imageUrl || []}
                          onChange={(url: string[]) => {
                            form.setFieldsValue({ [field.name]: { imageUrl: url } });
                          }}
                        />
                      </Form.Item>
                    </div>
                    <Form.List name={[field.name, 'productSize']}>
                      {(subFields, subOpt) => {
                        return (
                          <>
                            {subFields.map((subField) => (
                              <div key={`productOption-${field.name}-${field.key}-productSize-${subField.name}-${subField.key}`}>
                                <div className='flex w-full gap-x-4'>
                                  <Form.Item
                                    name={[subField.name, 'sizeId']}
                                    label={<p className='text-bold text-lg'>Size</p>}
                                    className='w-full'
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Please input size!',
                                      },
                                    ]}
                                  >
                                    <Select size='large' labelRender={(label) => <p className='text-lg'>{label.label}</p>} placeholder='Size'>
                                      {filterSize(
                                        (form.getFieldValue(['productOption', field.name, 'productSize']) as { sizeId: string; quantity: number }[])
                                          .map((item) => item.sizeId)
                                          .filter((item) => item !== '')
                                      ).map((item, index) => (
                                        <Select.Option
                                          key={`productOption-${field.name}-=productSize-${item.label}-${index}`}
                                          value={item.value}
                                          disabled={item.disabled}
                                        >
                                          {item.label}
                                        </Select.Option>
                                      ))}
                                    </Select>
                                  </Form.Item>
                                  <Form.Item
                                    name={[subField.name, 'quantity']}
                                    label={<p className='text-bold text-lg'>Quantity</p>}
                                    className='w-full'
                                    validateFirst
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Please input quantity!',
                                      },
                                      {
                                        validator(_, value) {
                                          if (value <= 0) {
                                            return Promise.reject('Quantity must be greater than 0');
                                          }
                                          return Promise.resolve();
                                        },
                                      },
                                    ]}
                                  >
                                    <div className='flex w-full gap-x-2'>
                                      <Input size='large' type='number' placeholder='Quantity' className='[&::-webkit-inner-spin-button]:appearance-none' />
                                      <Button
                                        size='large'
                                        htmlType='button'
                                        disabled={subFields.length === 1}
                                        onClick={() => {
                                          subOpt.remove(subField.name);
                                        }}
                                      >
                                        <RiDeleteBin6Line />
                                      </Button>
                                    </div>
                                  </Form.Item>
                                </div>
                              </div>
                            ))}
                            {subFields.length < props.sizeOption.length && (
                              <div className='flex w-full justify-between rounded-xl bg-purplebg p-2'>
                                <p className='content-center text-lg'>Add Size</p>
                                <button type='button' onClick={() => subOpt.add({ sizeId: '', quantity: 0 })} className='text-lg text-purple1'>
                                  + Product Name
                                </button>
                              </div>
                            )}
                          </>
                        );
                      }}
                    </Form.List>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Form.List>
      <div className='flex w-full justify-center'>
        <Button type='primary' htmlType='submit' size='large'>
          Submit
        </Button>
      </div>
    </Form>
  );
}

export default CreateProduct;
