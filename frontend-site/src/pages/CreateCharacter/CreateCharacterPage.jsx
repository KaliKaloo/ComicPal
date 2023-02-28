import { useState } from "react";
import { useForm } from "react-hook-form";
import FeedbackCard from "../../components/ui/FeedbackCard";
import MainLayout from "../../layout/MainLayout";
import styles from "../../assets/style";
import SecondaryButton from "../../components/ui/SecondaryButton";
import { PhotoIcon } from "@heroicons/react/24/outline";

function CreateCharacterPage() {
  const [prompt, setPrompt] = useState("");
  const [characterPrompt1, setCharacterPrompt1] = useState("");
  const [characterPrompt2, setCharacterPrompt2] = useState("");
  const [imageURL, setImageURL] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const generateImage = async () => {
    const response = await fetch("http://localhost:3080/image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: characterPrompt1,
      }),
    });
    const res = await response.json();
    setImageURL(res.url);
  };

  const onSubmit = (data) => {
    let combinedData =
      data.gender +
      " with " +
      data.eyeColor +
      " colored eyes. " +
      data.hair +
      " hair. " +
      data.skin +
      "skin. " +
      data.other;

    console.log(combinedData);
    setCharacterPrompt1(combinedData)
    generateImage()
  };

  return (
    <MainLayout footer="noFooter">
      <div
        className={`${styles.flexCenter} bg-[#edecea] relative h-[calc(100vh-56px)] items-center font-poppins overflow-auto`}
      >
        <div className="absolute bottom-0 left-0 ml-[-2rem] md:scale-75 z-40 scale-0 duration-200">
          <FeedbackCard noIcon={true} />
        </div>
        <div className=" flex flex-col gap-10 lg:py-0 py-12 md:px-20 h-full lg:w-[80%]">
          <div className="flex-1 flex lg:flex-row flex-col justify-between gap-4 items-center ">
            <div className="flex-1 bg-white items-center justify-center flex h-[70%] w-[70%] rounded-md shadow-lg">
              {imageURL !== "" ? (
                <img
                  src={imageURL}
                  alt=""
                  className="object-contain"
                ></img>
              ) : (
                <div className="h-80 w-96 flex justify-center items-center text-gray-300">
                  <PhotoIcon
                    className="h-20 w-20 hover:cursor-pointer"
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>

            <div className="flex-1">
              <form
                className="flex flex-col space-y-3"
                onSubmit={handleSubmit(onSubmit)}
              >
                <label className="block text-gray-700 text-md font-bold mt-3 mb-2">Gender</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="Gender"
                  {...register("gender")}
                />
                <label className="block text-gray-700 text-md font-bold mt-3 mb-2">Eye Color</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="EyeColor"
                  {...register("eyeColor")}
                />
                <label className="block text-gray-700 text-md font-bold mt-3 mb-2">Skin description</label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="Skin"
                  {...register("skin")}
                />
                <label className="block text-gray-700 text-md font-bold mt-3 mb-2">Hair description</label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="Hair"
                  {...register("hair")}
                />
                <label className="block text-gray-700 text-md font-bold mt-3 mb-2">More details</label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="Other"
                  {...register("other")}
                />
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className={`py-3 px-6  font-poppins font-medium text-[18px] rounded-full ${styles}duration-300 w-36 h-20 bg-lightGreen text-white hover:bg-[#007864]`}
                  >
                    Generate
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* <div className="flex-1"> */}
          {/* <div>
              Personality: Text generate Background: Text generate Other: Text
              generate
            </div>
            <SecondaryButton
              text="Generate a character description"
              styles={" w-32 bg-lightGreen text-white hover:bg-[#007864]"}
            /> */}
          {/* </div> */}
        </div>
      </div>
    </MainLayout>
  );
}

export default CreateCharacterPage;
