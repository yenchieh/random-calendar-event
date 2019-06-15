
export interface Member {
  id: string;
  name: string;
  title: string;
  icon: string;
  email: string;
  note: string;
  selected: boolean;
}

export interface MemberState {
  members: Member[];
}
