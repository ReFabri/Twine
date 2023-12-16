import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";

const UserPage = () => {
  const showToast = useShowToast();
  const [user, setUser] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error, "error");
      }
    };
    getUser();
  }, [username, showToast]);

  if (!user) return null;

  return (
    <>
      <UserHeader user={user} />
      <UserPost likes={475} replies={264} postTitle="First post!" />
      <UserPost
        likes={475}
        replies={264}
        postImg="post1.jpg"
        postTitle="Let's talk about twine!"
      />
      <UserPost
        likes={35}
        replies={46}
        postImg="post2.jpg"
        postTitle="Twine is awesome!"
      />
      <UserPost
        likes={297}
        replies={165}
        postImg="post1.jpg"
        postTitle="Twine is the best invention since sliced bread!"
      />
      <UserPost
        likes={28}
        replies={1262}
        postImg="post2.jpg"
        postTitle="Twine is very Twine!"
      />
    </>
  );
};

export default UserPage;
