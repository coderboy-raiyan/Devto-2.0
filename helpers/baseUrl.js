const baserUrl =
    process.env.NODE_ENV === "production"
        ? "https://devto-clone-ten.vercel.app"
        : "http://localhost:3000/";

export default baserUrl;
