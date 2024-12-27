export function format(date: Date, format: string): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12;
  
  return format
    .replace('yyyy', String(year))
    .replace('MM', month)
    .replace('dd', day)
    .replace('d', String(d.getDate()))
    .replace('hh', String(hour12).padStart(2, '0'))
    .replace('HH', String(hours).padStart(2, '0'))
    .replace('mm', minutes)
    .replace('a', ampm);
}

export function startOfMonth(date: Date): Date {
  const d = new Date(date);
  d.setDate(1);
  return d;
}

export function addMonths(date: Date, amount: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + amount);
  return d;
}

export function subMonths(date: Date, amount: number): Date {
  return addMonths(date, -amount);
}

export function addHours(date: Date, hours: number): Date {
  const d = new Date(date);
  d.setHours(d.getHours() + hours);
  return d;
}

export function setHours(date: Date, hours: number): Date {
  const d = new Date(date);
  d.setHours(hours);
  return d;
}

export function getDaysInMonth(date: Date) {
  const firstDay = startOfMonth(date);
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const startDay = firstDay.getDay();
  
  const monthYear = new Intl.DateTimeFormat('en-US', { 
    month: 'long', 
    year: 'numeric' 
  }).format(date);

  const dates: (Date | null)[] = [];
  
  for (let i = 0; i < startDay; i++) {
    dates.push(null);
  }
  
  for (let i = 1; i <= daysInMonth; i++) {
    dates.push(new Date(date.getFullYear(), date.getMonth(), i));
  }
  
  while (dates.length % 7 !== 0) {
    dates.push(null);
  }

  return { dates, monthYear };
}