import { useEffect, useState } from "react";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
import useShowToast from "../hooks/useShowToast";
import UserHeader from "../components/UserHeader";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";

const UserPage = () => {
  const showToast = useShowToast();
  const { user, loading } = useGetUserProfile();
  const { username } = useParams();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [fetchingPosts, setFetchingPosts] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        setFetchingPosts(true);
        const res = await fetch(`/api/posts/user/${username}`);
        const data = await res.json();
        if (data.error) return showToast("Error", data.error, "error");
        setPosts(data);
      } catch (error) {
        showToast("Error", error.message, "error");
        setPosts([]);
      } finally {
        setFetchingPosts(false);
      }
    };
    getPosts();
  }, [username, showToast, setPosts]);

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
      {fetchingPosts && (
        <Flex justifyContent={"center"} my={12}>
          <Spinner size={"xl"} />
        </Flex>
      )}
      {!fetchingPosts && !posts.length && (
        <Text my={12} fontSize={20} textAlign={"center"}>
          No posts created yet..
        </Text>
      )}
      {!fetchingPosts &&
        posts.length > 0 &&
        posts.map((post) => {
          return <Post key={post._id} post={post} postedBy={post.postedBy} />;
        })}
    </>
  );
};

export default UserPage;
