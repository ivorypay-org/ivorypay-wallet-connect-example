import errorSvg from "../assets/notfound.svg";

const NotFound = () => {
  return (
    <div className="px-6 py-8 max-w-[1440px] error flex-col xl:px-20 w-full m-auto">
      <img src={errorSvg} className="m-auto" alt="404 Not Found" />
      <div className="text-center text-[#02084B]">
        <h3 className="text-xl md:text-4xl font-bold text-[#02084B]">
          Oops! 404 Not Found
        </h3>
        <p>This Page doesn't exist</p>
      </div>
    </div>
  );
};
export default NotFound;
