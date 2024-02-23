import { format } from "date-fns";
import { ja } from "date-fns/locale";

export function formatDate(dateStr: string, dateFormat: string) {
  try {
    const formattedDateStr = format(new Date(dateStr), dateFormat, {
      locale: ja,
    });
    return formattedDateStr;
  } catch (e) {
    console.error(`unexpected errro occured. exception: ${e}`);
    throw e;
  }
}
