import { retry } from "@/middleware/retry";
import { os } from "@orpc/server";

export const pub = os.use(retry({ times: 3 }));
