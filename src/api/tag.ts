'use server';
import { IFilterArray } from '@/interfaces/product';
import { ITag, ITagGroup } from '@/interfaces/tag';
import { axiosInstance } from '@/utils/axiosInstanceServer';

export const getTags = async (tagGroupId?: string) => {
  try {
    const response = await axiosInstance.get(`/tag`, {
      ...(tagGroupId ? { params: { tagGroupId: tagGroupId } } : {}),
    });
    if (response.status !== 200) {
      throw new Error('Failed to fetch tags');
    }
    return response.data.data as ITag[];
  } catch {
    return [];
  }
};

export const getAllTagGroup = async () => {
  try {
    const response = await axiosInstance.get(`/tag_group`, {
      params: {
        withTags: true,
      },
    });
    if (response.status !== 200) {
      throw new Error('Failed to fetch tag group');
    }
    const tagFilter = response.data.data.map((tagGroup: ITagGroup) => {
      return {
        name: tagGroup.label,
        type: 'checkbox',
        value: tagGroup.tag.map((tag) => {
          return {
            label: tag.label,
            checked: false,
          };
        }),
      };
    });
    return tagFilter as IFilterArray[];
  } catch {
    return [];
  }
};
