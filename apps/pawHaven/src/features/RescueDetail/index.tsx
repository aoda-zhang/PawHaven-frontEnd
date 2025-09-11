import { useParams } from 'react-router-dom';

import { useFetchAnimalDetail } from './apis/queries';
import AnimalBasicInfo from './components/AnimalBasicInfo';
import RescueInteraction from './components/RescueInteraction';
import RescueTimeline from './components/RescueTimeline';
import styles from './index.module.css';
import { RescueUpdate } from './types';

const RescueDetailPage = () => {
  const { animalID } = useParams<{ animalID: string }>();
  const { data: animal } = useFetchAnimalDetail(animalID ?? '');
  const updates: RescueUpdate[] = [
    {
      id: 'update_001',
      timestamp: '2023-11-12T09:10:00Z',
      status: 'pending',
      content: '用户陈小姐上报发现流浪猫',
      operator: {
        id: 'user_102',
        name: '陈小姐',
        avatar: 'https://pawhaven-mock.com/avatars/user102.jpg',
        role: 'reporter',
      },
    },
    {
      id: 'update_002',
      timestamp: '2023-11-12T11:30:00Z',
      status: 'inProgress',
      content: '志愿者小王接单前往救助',
      operator: {
        id: 'volunteer_05',
        name: '王志愿',
        avatar: 'https://pawhaven-mock.com/avatars/vol05.jpg',
        role: 'rescuer',
      },
    },
    {
      id: 'update_003',
      timestamp: '2023-11-12T14:20:00Z',
      status: 'treated',
      content: '已将猫咪带至城西救助站，完成基础清洁',
      operator: {
        id: 'volunteer_05',
        name: '王志愿',
        avatar: 'https://pawhaven-mock.com/avatars/vol05.jpg',
        role: 'rescuer',
      },
      images: ['https://pawhaven-mock.com/updates/coal_shelter.jpg'],
    },
    {
      id: 'update_004',
      timestamp: '2023-11-13T10:15:00Z',
      status: 'recovering',
      content: '体检完成，身体健康，已接种基础疫苗',
      operator: {
        id: 'clinic_03',
        name: '爱心宠物医院',
        avatar: 'https://pawhaven-mock.com/avatars/clinic03.jpg',
        role: 'admin',
      },
    },
  ];

  return (
    <div className={styles.container}>
      {animal && <AnimalBasicInfo animal={animal} />}

      <RescueTimeline updates={updates} />
      {animalID && <RescueInteraction animalId={animalID} />}
    </div>
  );
};

export default RescueDetailPage;
