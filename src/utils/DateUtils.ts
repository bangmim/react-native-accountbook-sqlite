// 특정문자열이 들어오면 string형태로 return

export const convertToDateString = (time: number): string => {
  const date = new Date(time);

  const addZeroIfOneCharecter = (number: number): string => {
    if (number < 10) {
      return `0${number}`;
    }
    return number.toString();
  };

  return `${date.getFullYear()}-${addZeroIfOneCharecter(
    date.getMonth() + 1, //month는 0부터 시작하기때문에 +1 해준다
  )}-${addZeroIfOneCharecter(date.getDate())} ${addZeroIfOneCharecter(
    date.getHours(),
  )}:${addZeroIfOneCharecter(date.getMinutes())}`;
};
