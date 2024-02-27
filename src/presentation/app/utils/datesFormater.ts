import { format, parseISO } from "date-fns";

function formatDateStr(date: string): string {
  if (!date) {
    return '';
  }
  
  const parsedDate = parseISO(date);
  return format(parsedDate, 'yyyy/MM/dd');
}

function formatDateInput(date: string): string {
  if (!date) {
    return '';
  }

  const parsedDate = parseISO(date);
  return format(parsedDate, 'yyyy-MM-dd');
}


export { formatDateStr, formatDateInput };
