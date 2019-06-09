import {Member} from '@/model/member';

export interface Event {
  title: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  description: string;
}

export interface CalendarEventView {
  title: string;
  member: Member;
  date: string;
}
