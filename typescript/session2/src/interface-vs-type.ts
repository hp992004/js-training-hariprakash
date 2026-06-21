/*
Using an interface because it represents the shape of an object
and can be extended or implemented by classes if needed.
*/
interface APIPaginationResponse<T> {
  page: number;
  pageSize: number;
  total: number;
  data: T[];
}


const user: APIPaginationResponse<string> = {
  page: 1,
  pageSize: 14,
  total: 50,
  data: ["Alya", "albert","Manov","Deepti"]
};
// Using a type alias because unions cannot be created with interfaces.
type StringOrArray = string | string[];


const String1: StringOrArray = "Welcome";
const Array1: StringOrArray = ["Welcome", "To","TypeScript","Tutorial"];

/*
Using an interface because other notification types like
EmailNotification and PushNotification can extend it.*/
interface Notification {
  id: string;
  message: string;
  createdAt: Date;
}

interface EmailNotification extends Notification {
  email: string;
}

interface PushNotification extends Notification {
  device: string;
}
/*
Using a type alias because function signatures are usually
cleaner and easier to define with type aliases.*/
type Processor = (value: number) => void;

const process: Processor = (value) => {
  console.log(value);
};

// Using a type alias because literal unions are created using types.
type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

const operation: Method = "POST";