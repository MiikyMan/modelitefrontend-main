'use client';
import { Filters, FilterValue } from '@/interfaces/product';
import { Button, Checkbox, Collapse } from 'antd';
import React, { FC } from 'react';
import { SlArrowDown } from 'react-icons/sl';

type Props = {
  filterList: Filters;
  setFilterList: React.Dispatch<React.SetStateAction<Filters>>;
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
};

const FilterSidebar: FC<Props> = (props: Props) => {
  return (
    <>
      <div className='space-y-* h-full min-h-[calc(100vh-4rem)] w-full flex-col overflow-y-auto bg-white lg:absolute'>
        <div className='mx-auto flex flex-col overflow-y-auto px-4 pt-4 lg:p-6'>
          {/*  Item Filter List*/}
          {Object.keys(props.filterList).map((key) => (
            <CollapseBuilder key={key} category={props.filterList[key]} categoryKey={key} setFilterFn={props.setFilterList} />
          ))}
        </div>
        {/* Fix Button on bottom of page for reset */}
        <nav className='sticky bottom-0 flex w-full gap-x-4 bg-white p-4 align-bottom lg:hidden'>
          <Button
            className='w-full'
            type='primary'
            onClick={() => {
              props.setFilterList((prev) => {
                return Object.keys(prev).reduce((acc, key) => {
                  acc[key] = { ...prev[key], value: prev[key].value.map((val) => ({ ...val, checked: false })) };
                  return acc;
                }, {} as Filters);
              });
              props.setOpenFilter(false);
            }}
          >
            Reset Filter
          </Button>
          <Button
            className='w-full'
            type='primary'
            onClick={() => {
              props.setOpenFilter(false);
            }}
          >
            Apply Filter
          </Button>
        </nav>
      </div>
    </>
  );
};

const CollapseBuilder: FC<{
  category: FilterValue;
  categoryKey: string;
  setFilterFn: React.Dispatch<React.SetStateAction<Filters>>;
}> = ({ category, categoryKey, setFilterFn }) => {
  switch (category.type) {
    case 'checkbox':
      return (
        <div className='border-b-2'>
          <Collapse
            defaultActiveKey={category.value.some((item) => item.checked) ? `item${category.name}` : undefined}
            ghost
            bordered={false}
            className='items-center justify-between border-b-2'
            key={`category${category.name}`}
            items={[
              {
                showArrow: false,
                key: `item${category.name}`,
                label: (
                  <div className='flex items-center justify-between'>
                    {category.name} <SlArrowDown />
                  </div>
                ),
                children: category.value.map((item) => (
                  <div key={`item${category.name}_${item.label}`} className='px-1 py-2'>
                    <Checkbox
                      className='w-full'
                      checked={item.checked}
                      onChange={(e) => {
                        const newValues = e.target.checked;
                        setFilterFn((prev) => {
                          return {
                            ...prev,
                            [categoryKey]: {
                              ...prev[categoryKey],
                              value: prev[categoryKey].value.map((value) => {
                                if (value.label === item.label) {
                                  return { ...value, checked: newValues };
                                }
                                return value;
                              }),
                            },
                          };
                        });
                      }}
                    >
                      {item.label}
                    </Checkbox>
                  </div>
                )),
              },
            ]}
          ></Collapse>
        </div>
      );
    case 'select':
      return (
        <div className='border-b-2'>
          <Collapse
            ghost
            bordered={false}
            className='items-center justify-between border-b-2'
            key={`category${category.name}`}
            items={[
              {
                showArrow: false,
                key: `item${category.name}`,
                label: (
                  <div className='flex items-center justify-between'>
                    {category.name} <SlArrowDown />
                  </div>
                ),
                children: (
                  <div className='grid grid-cols-3 place-items-center gap-3'>
                    {category.value.map((item) => (
                      <Button className='w-full' type={item.checked ? 'primary' : 'default'} size='large' key={`item${category.name}_${item.label}`}>
                        {item.label}
                      </Button>
                    ))}
                  </div>
                ),
              },
            ]}
          ></Collapse>
        </div>
      );
    default:
      return <></>;
  }
};

export default FilterSidebar;
