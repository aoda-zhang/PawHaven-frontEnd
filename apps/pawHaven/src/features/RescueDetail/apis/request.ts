import http from '@shared/cores/http';

import { AnimalDetail, AnimalRescueStatus } from '@/types/AnimalType';

export const getAnimalDetail = (id: string) => {
  // return http.get(`/animal/${id}`);
  console.log('Fetching animal detail for ID:', id);

  const animal: AnimalDetail = {
    id: 'animal_007',
    name: '煤球',
    animalType: 'cat',
    age: 'young',
    appearance: {
      color: '黑色',
      hasInjury: false,
      otherFeatures: '绿眼睛，短毛，尾巴蓬松',
      injuryDescription: '',
    },
    location: {
      address: '北京市朝阳区建国路88号写字楼下',
      latitude: 39.908823,
      longitude: 116.39747,
    },
    foundTime: '2023-11-12T08:45:00Z',
    status: 'pending',
    statusDescription: '发现时在写字楼楼下晒太阳，主动蹭人，已做初步健康检查',
    images: [
      'https://pawhaven-mock.com/animals/coal_1.jpg',
      'https://pawhaven-mock.com/animals/coal_2.jpg',
      'https://pawhaven-mock.com/animals/coal_3.jpg',
    ],
    reporter: {
      id: 'user_102',
      name: '陈小姐',
      contactInfo: {
        phone: '13576543210',
        email: 'chen@example.com',
      },
    },

    updates: [
      {
        id: 'update_001',
        timestamp: '2023-11-12T09:10:00Z',
        content: '用户陈小姐上报发现流浪猫',
        status: 'pending',
        operator: {
          id: 'user_102',
          name: '陈小姐',
          avatar: 'https://pawhaven-mock.com/avatars/user102.jpg',
          role: 'reporter',
        },
      },
    ],
    interactions: {
      comments: [
        {
          id: 'comment_001',
          userId: 'user_201',
          userName: '李同学',
          avatar: 'https://pawhaven-mock.com/avatars/user201.jpg',
          content: '这只猫我见过！上周在附近公园也出现过',
          timestamp: '2023-11-12T10:05:00Z',
          likes: 3,
        },
      ],
      rescueParticipants: [
        {
          id: 'volunteer_05',
          name: '王志愿',
          avatar: 'https://pawhaven-mock.com/avatars/vol05.jpg',
          role: 'rescuer',
          joinedAt: '2023-11-12T11:30:00Z',
        },
      ],
    },
    stats: {
      viewCount: 0,
      likeCount: 0,
      shareCount: 0,
    },
    createdAt: '',
    updatedAt: '',
  };
  return animal;
};

export const updateRescueStatus = (id: string, status: AnimalRescueStatus) => {
  return http.put(`/animal/${id}/status`, { status });
};
