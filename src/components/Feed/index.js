import "./Feed.css";
import { PostsContext } from "../Context/PostsContext ";
import NewPost from "./newPost";
import { FaPlus, FaSearch } from "react-icons/fa";
import { useState, useContext, useEffect } from "react";
import UserContext from "../Context/UserContext";
import api from "../../api/axios";
import { Link } from "react-router-dom";

const Feed = () => {
  const { posts, setPosts } = useContext(PostsContext);
  const { userData } = useContext(UserContext);
  const { isAuthenticated } = userData;

  const [searchTerm, setSearchTerm] = useState("");
  const [showNewPostDialog, setShowNewPostDialog] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(isAuthenticated);
  }, [isAuthenticated]);

  const openNewPostDialog = () => {
    setShowNewPostDialog(true);
  };

  const closeNewPostDialog = () => {
    setShowNewPostDialog(false);
  };

  // Filter posts based on the search term
  const filteredPosts = searchTerm
    ? posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : posts;

  const addNewPost = async (newPost) => {
    const postId = newPost.get("id");
    const title = newPost.get("title");
    const image = newPost.getAll("image");
    // const imagesURL = images.map((image) => URL.createObjectURL(image));

    const author = newPost.get("author");
    // const user = newPost.get("user");
    // const publishDate = newPost.get("publishDate");
    // const postDate = newPost.get("postDate");
    const description = newPost.get("description");
    // const userId = newPost.get("userId");

    const postToAdd = {
      title: title,
      image: image,
      author: author,
      description: description,
      id: postId,
    };


    // user: user,
    // publishDate: publishDate,
    // postDate: postDate,
    // userId: userId,

    try {
      const response = await api.post("/books/create", postToAdd);
    
      if (response.status === 201) {
        console.log("Book created successfully", response.data);
        // Additional logic for a successful creation can go here, e.g., updating state or redirecting the user.
      } else {
        console.warn("Unexpected response status:", response.status);
        // Handle unexpected statuses if needed
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Error creating book:", error.response.data);
        // You can handle specific error statuses here if needed
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response received:", error.request);
      } else {
        // Something happened while setting up the request
        console.error("Error setting up the request:", error.message);
      }
    }
    
    setPosts([...posts, postToAdd]);
    setShowNewPostDialog(false);
  };

  return (
    <div className="content">
      <div className="container">
        <div className="post-header">
          <h3>Posts</h3>
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="By Book Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className={` btn-add ${isVisible ? "" : "hide"}`}
            onClick={openNewPostDialog}
          >
            <FaPlus /> <span className="new-post-text">New Post</span>
          </button>
        </div>
        {showNewPostDialog && (
          <NewPost onClose={closeNewPostDialog} onAddPost={addNewPost} />
        )}
        <div className="posts">
          {filteredPosts.map((post) => (
            <Link to={`/post/${post.id}`} key={post.id} className="card-link">
              <div className="card">
                <img src={post.image} alt={post.title} />
                <div className="card-content">
                  <h3>{post.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
