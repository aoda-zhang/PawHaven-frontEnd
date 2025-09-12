import RescueStatus from '@/constants/RescueStatus';
import {
  ColorPrefix,
  RescueStatusType,
  StatusColorType,
} from '@/features/Home/types';

interface GetStatusColorParams {
  status: RescueStatusType;
  prefix: ColorPrefix;
}

const getStatusColor = ({
  status,
  prefix,
}: GetStatusColorParams): StatusColorType => {
  const statusColorMapping: Record<RescueStatusType, StatusColorType> = {
    pending: `${prefix}-rescue-${RescueStatus.pending}`,
    inProgress: `${prefix}-rescue-${RescueStatus.inProgress}`,
    treated: `${prefix}-rescue-${RescueStatus.treated}`,
    recovering: `${prefix}-rescue-${RescueStatus.recovering}`,
    awaitingAdoption: `${prefix}-rescue-${RescueStatus.awaitingAdoption}`,
    adopted: `${prefix}-rescue-${RescueStatus.adopted}`,
    failed: `${prefix}-rescue-${RescueStatus.failed}`,
  };

  return statusColorMapping[status];
};

export default getStatusColor;
