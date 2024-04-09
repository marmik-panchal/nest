import { iResponseStatusMessage } from 'src/utils/response/response.interface';
import * as CommonResponse from './common_response.constants';

// Response action name
export const responseName = {
  ...CommonResponse.responseName,
};

// Response information
export const responseInfo: Record<string, iResponseStatusMessage> = {
  ...CommonResponse.responseInfo,
};
