type ColorPrefix = 'text' | 'bg' | 'border';

type RescueStatus =
  | 'pending'
  | 'inProgress'
  | 'treated'
  | 'recovering'
  | 'awaitingAdoption'
  | 'adopted'
  | 'failed';

interface GetStatusColorParams {
  status: RescueStatus;
  prefix: ColorPrefix;
}

const getStatusColor = ({ status, prefix }: GetStatusColorParams): string => {
  const statusColorMapping: Record<RescueStatus, string> = {
    pending: `${prefix}-rescue-pending`,
    inProgress: `${prefix}-rescue-inProgress`,
    treated: `${prefix}-rescue-treated`,
    recovering: `${prefix}-rescue-recovering`,
    awaitingAdoption: `${prefix}-rescue-awaitingAdoption`,
    adopted: `${prefix}-rescue-adopted`,
    failed: `${prefix}-rescue-failed`,
  };

  return statusColorMapping[status];
};

export default getStatusColor;
