/*
 * CustomSegmentsModal Messages
 *
 * This contains all the text for the CustomSegmentsModal component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.components.CustomSegmentsModal.header',
    defaultMessage: 'This is the CustomSegmentsModal component !',
  },
  customSegments: {
    id: 'app.components.CustomSegmentsModal.customSegments',
    defaultMessage: 'Custom Segments',
  },
  segmentLabel: {
    id: 'app.components.CustomSegmentsModal.segmentLabel',
    defaultMessage: 'Segment Label',
  },
  startDate: {
    id: 'app.components.CustomSegmentsModal.startDate',
    defaultMessage: 'Start Date',
  },
  endDate: {
    id: 'app.components.CustomSegmentsModal.endDate',
    defaultMessage: 'End Date',
  },
  cancel: {
    id: 'app.components.CustomSegmentsModal.cancel',
    defaultMessage: 'Cancel',
  },
  add: {
    id: 'app.components.CustomSegmentsModal.add',
    defaultMessage: 'Add',
  },
  delete: {
    id: 'app.components.CustomSegmentsModal.delete',
    defaultMessage: 'Delete',
  },
  save: {
    id: 'app.components.CustomSegmentsModal.save',
    defaultMessage: 'Save',
  },
  dateEmptyValidation: {
    id: 'app.components.CustomSegmentsModal.dateEmptyValidation',
    defaultMessage: 'Date Should not be Empty.',
  },
  startDateEndDateError: {
    id: 'app.components.CustomSegmentsModal.startDateEndDateError',
    defaultMessage: 'End Date should be greater than or equal to start date.',
  },
  startDateSegementLabelError: {
    id: 'app.components.CustomSegmentsModal.startDateSegementLabelError',
    defaultMessage: 'Start Date of next record should be one day more to end date of previous record. Segment Label should not be empty or duplicate.',
  },
  segmentLabelError: {
    id: 'app.components.CustomSegmentsModal.segmentLabelError',
    defaultMessage: 'Segment Label should not be empty or duplicate.',
  },
  startDateError: {
    id: 'app.components.CustomSegmentsModal.startDateError',
    defaultMessage: 'Start Date of next record should be one day more to end date of previous record.',
  },
});
