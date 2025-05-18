import { useState, useEffect } from "react";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      //외부에서 받아온 값을 최신 상태 함수에 담아서 받아옴
      setDebouncedValue(value);
      //두번쨰 인자로 dealy도 받아옴
    }, delay);


    //컴포넌트 언마운트 또는 
    return () => {
      clearTimeout(handler); // 이전 타이머를 정리하여 덮어씌우기 방지
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;