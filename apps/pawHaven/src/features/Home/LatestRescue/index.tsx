import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Tailwind will tree-shake dynamic variables, so we need to define all possible values
const rescueStatusColorMapping = {
  pending: 'bg-rescue-pending',
  inProgress: 'bg-rescue-inProgress',
  treated: 'bg-rescue-treated',
  recovering: 'bg-rescue-recovering',
  awaitingAdoption: 'bg-rescue-awaitingAdoption',
  adopted: 'bg-rescue-adopted',
  failed: 'bg-rescue-failed',
};

interface RescueItemType {
  name: string;
  img: string;
  description: string;
  location: string;
  time: string;
  status: keyof typeof rescueStatusColorMapping;
}

const rescues: RescueItemType[] = [
  {
    name: '茂密',
    img: 'https://daoinsights.com/wp-content/webp-express/webp-images/uploads/2022/03/anoir-chafik-2_3c4dIFYFU-unsplash-1870x1169.jpg.webp',
    description: '一只非常可爱的猫咪，性格温顺，喜欢与人亲近，适合家庭养护。',
    location: '双流天府五街',
    time: '2023-10-20 12:00',
    status: 'pending',
  },
  {
    name: '虎子',
    img: 'https://d.newsweek.com/en/full/2050102/stray-cats.jpg?w=1200&f=7d728c9cbd5cd73470c100ff9cd51d59',
    description:
      '一只活泼好动的狗狗，喜欢户外活动，需要一个有爱心的家庭来照顾它。',
    location: '巴黎时尚界',
    time: '2023-10-20 12:00',
    status: 'treated',
  },
  {
    name: '乐乐',
    img: 'https://media.4-paws.org/1/b/1/4/1b14c5ffc386210e11c20c5dd139b772af045503/VIER%20PFOTEN_2023-10-19_00181-3801x2534-3662x2534-1920x1329.jpg',
    description: '一只温柔乖巧的狗子，喜欢安静的环境，适合室内养护。',
    location: '香港中环',
    time: '2023-10-20 12:00',
    status: 'awaitingAdoption',
  },
];
const RescueItem = (item: RescueItemType) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-1 p-4 mb-4 border-1 border-border rounded-md cursor-pointer bg-white">
      <img
        src={item?.img}
        alt={item?.name}
        className="rounded-md w-full h-3/4 mb-3"
      />
      <p className="text-xl text-primary">{item?.name}</p>
      <p className="flex justify-between text-sm text-text-secondary">
        <span>{item?.location}</span>
        <span>{item?.time}</span>
      </p>
      <p className="text-text-secondary">{item?.description}</p>
      <button
        type="button"
        className={`rounded-full text-center text-white py-2 ${rescueStatusColorMapping[item?.status]} cursor-pointer
          `}
      >
        {t(`pawHaven.rescue_status_${item?.status}`)}
      </button>
    </div>
  );
};

const LatestRescue = () => {
  const { t } = useTranslation();
  return (
    <div className="px-4 lg:px-20">
      <div className="flex items-center justify-between my-4">
        <span className="text-base lg:text-2xl font-bold">
          {t('pawHaven.recent_rescue')}
        </span>
        <div className="flex items-center gap-4 cursor-pointer">
          <span>{t('common.view_all')}</span>
          <ArrowRight
            size="1.875rem"
            className="text-white bg-primary rounded-full"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {rescues?.map((item) => (
          <RescueItem {...item} key={item?.name} />
        ))}
      </div>
    </div>
  );
};

export default LatestRescue;
