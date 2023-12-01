import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";

const UserPage = () => {
  return (
    <>
      <UserHeader />
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
