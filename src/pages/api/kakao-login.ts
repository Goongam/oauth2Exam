// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

async function getToken(code: string) {
  //code를 통해 accessToken과 refreshToken 받아옴
  const resToken = await fetch("https://kauth.kakao.com/oauth/token", {
    method: "post",
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&code=${code}`,
  });

  return await resToken.json();
}

async function getUserData(token: { access_token: string }) {
  const userRes = await fetch("https://kapi.kakao.com/v2/user/me", {
    method: "post",
    headers: {
      Authorization: `Bearer ${token.access_token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return await userRes.json();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const token = await getToken(req.body.code);
  const userData = await getUserData(token);

  res.status(200).json({
    nickname: userData.kakao_account.profile.nickname,
    email: userData.kakao_account.email ?? undefined,
  });
}
