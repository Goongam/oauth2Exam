const REST_API_KEY = process.env.NEXT_PUBLIC_REST_API_KEY;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

export default function Home() {
  const url = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const login = () => {
    window.location.href = url;
  };

  return (
    <>
      <button onClick={login}>카카오 로그인</button>
    </>
  );
}
