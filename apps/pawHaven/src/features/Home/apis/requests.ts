import http from '@shared/cores/http';

import { RescueItemType } from '../types';

export const getLatestRescuesByNumber = (): Promise<RescueItemType[]> => {
  // return http.get(`/rescues/latest/${number}`);
  const mockdata: RescueItemType[] = [
    {
      animalID: '001',
      name: '茂密',
      img: 'https://daoinsights.com/wp-content/webp-express/webp-images/uploads/2022/03/anoir-chafik-2_3c4dIFYFU-unsplash-1870x1169.jpg.webp',
      description: '一只非常可爱的猫咪，性格温顺，喜欢与人亲近，适合家庭养护。',
      location: '双流天府五街',
      time: '2023-10-20 12:00',
      status: 'pending',
    },
    {
      animalID: '002',
      name: '虎子',
      img: 'https://d.newsweek.com/en/full/2050102/stray-cats.jpg?w=1200&f=7d728c9cbd5cd73470c100ff9cd51d59',
      description:
        '一只活泼好动的狗狗，喜欢户外活动，需要一个有爱心的家庭来照顾它。',
      location: '巴黎时尚界',
      time: '2023-10-20 12:00',
      status: 'treated',
    },
    {
      animalID: '003',
      name: '乐乐',
      img: 'https://media.4-paws.org/1/b/1/4/1b14c5ffc386210e11c20c5dd139b772af045503/VIER%20PFOTEN_2023-10-19_00181-3801x2534-3662x2534-1920x1329.jpg',
      description: '一只温柔乖巧的狗子，喜欢安静的环境，适合室内养护。',
      location: '香港中环',
      time: '2023-10-20 12:00',
      status: 'awaitingAdoption',
    },
  ];
  return Promise.resolve(mockdata);
};

export const getLatestStories = (): Promise<RescueItemType[]> => {
  return http.get('/rescues/latest');
};
