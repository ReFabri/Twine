import { useEffect, useState } from "react";
import { Flex, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
import useShowToast from "../hooks/useShowToast";
import UserHeader from "../components/UserHeader";

const UserPage = () => {
  const showToast = useShowToast();
  const [user, setUser] = useState(null);
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if (data.error) return showToast("Error", data.error, "error");
        setUser(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };

    const getPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/posts/user/${username}`);
        const data = await res.json();
        if (data.error) return showToast("Error", data.error, "error");
        setPosts(data);
      } catch (error) {
        showToast("Error", error.message, "error");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    getUser();
    getPosts();
  }, [username, showToast]);

  console.log(posts);

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />;
      </Flex>
    );
  }
  if (!user && !loading) return <h1>User not found</h1>;

  return (
    <>
      <UserHeader user={user} />
      {posts.length &&
        posts.map((post) => {
          return <Post key={post._id} post={post} postedBy={post.postedBy} />;
        })}
    </>
  );
};

export default UserPage;
