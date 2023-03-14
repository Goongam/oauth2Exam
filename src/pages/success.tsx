import { checkPrimeSync } from "crypto";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

const REST_API_KEY = process.env.NEXT_PUBLIC_REST_API_KEY;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

export default function Success() {
  //받아온 query의 code추출
  const router = useRouter();
  const { code } = router.query;

  const getToken = useCallback(async (code: string | string[]) => {
    //받아온 토큰으로 사용자 정보 불러오기 (cors에러, 백에서 진행)
    const userRes = await fetch("api/kakao-login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
      }),
    });
    const userData = await userRes.json();
    console.log(userData);
  }, []);

  useEffect(() => {
    if (code) {
      getToken(code);
    }
  }, [code]);

  return <></>;
}
