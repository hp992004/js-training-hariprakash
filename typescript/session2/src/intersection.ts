
type Identifiable = {
  readonly id: string;
};

type Timestamped = {
  createdAt: Date;
  updatedAt: Date;
};

type SoftDeletable = {
  deletedAt?: Date;
  isDeleted: boolean;
};


type BaseRecord = Identifiable & Timestamped;

type UserRecord = BaseRecord & {
  name: string;
  email: string;
};

type AuditedUserRecord = UserRecord & SoftDeletable;

function isDeleted(record: SoftDeletable): boolean {
  return record.isDeleted;
}

const baseRecord: BaseRecord = {
  id: "REC001",
  createdAt: new Date("2025-01-10"),
  updatedAt: new Date("2025-06-20"),
};

const userRecord: UserRecord = {
  id: "USR101",
  createdAt: new Date("2025-02-15"),
  updatedAt: new Date("2025-06-20"),
  name: "Aarav",
  email: "aarav@example.com",
};

const auditedUser: AuditedUserRecord = {
  id: "USR102",
  createdAt: new Date("2025-03-01"),
  updatedAt: new Date("2025-06-20"),
  name: "Meera",
  email: "meera@example.com",
  isDeleted: true,
  deletedAt: new Date("2025-06-18"),
};

console.log(isDeleted(auditedUser));

/*
C['value'] becomes type 'never' because TypeScript tries to make
'value' be both a string and a number at the same time. Since no value
can be both a string and a number, this condition can never be satisfied,
so creating an object of type C is impossible.


type A = { value: string };
type B = { value: number };
type C = A & B;

const obj: C = {
  value: "Hello",
};

error TS2322: Type 'string' is not assignable to type 'never'.*/