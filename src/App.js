import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login&SignUp/Login";
import SignUp from "./components/Login&SignUp/SignUp";
import Landing from "./components/Landing";
import Feed from "./components/Feed";
import Profile from "./components/Profile/Profile";
import NewPost from "./components/Feed/newPost";
import Post from "./components/Feed/Post";
import About from "./components/About/About";
import "./App.css";
import { PostsProvider } from "./components/Context/PostsContext ";
import { UserProvider } from "./components/Context/UserContext";

function App() {
  return (
    <>
      <Router>
        <UserProvider>
          <PostsProvider>
            <Header />
            <Routes>
              <Route path="/home/*" element={<Feed />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route path="/post/:postId" element={<Post />} />
              <Route exact path="/post" element={<NewPost />} />
              <Route exact path="/signup" element={<SignUp />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/" element={<Landing />} />
              <Route exact path="/about" element={<About />} />
            </Routes>
          </PostsProvider>
        </UserProvider>
      </Router>
    </>
  );
}

export default App;
