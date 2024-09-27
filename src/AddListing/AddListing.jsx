import Header from "@/components/Header";
import carDetails from "@/Shared/carDetails.json";
import features from "@/Shared/features.json";
import { useEffect, useState } from "react";
import InputField from "./components/InputField";
import DropDownField from "./components/DropDownField";
import TextArea from "./components/TextArea";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { db } from "../../configs";
import { CarImages, CarListing } from "../../configs/schema";
import IconField from "./components/iconField";
import UploadImages from "./components/UploadImages";
import { BiLoaderAlt } from "react-icons/bi";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import moments from "moment";
import { eq } from "drizzle-orm";
import Service from "@/shared/Service";

function AddListing() {
  const [formData, setFormData] = useState({});
  const [featuresData, setFeatures] = useState({});
  const { user } = useUser();
  const [onSaveLoader, setOnSaveLoader] = useState(false);
  const navigate = useNavigate();
  const [triggerUploadImages, setTriggerUploadImages] = useState();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const recordId = searchParams.get("id");
  const [carInfo, setCarInfo] = useState();

  console.log(carInfo)

  useEffect(() => {
    const getListingDetails = async () => {
      const result = await db
        .select()
        .from(CarListing)
        .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
        .where(eq(CarListing.id, recordId));
        console.log(result)
      const res = Service.formatResult(result);
      setCarInfo(res[0]);
      setFeatures(res[0]?.features);
      setFormData(res[0]);
    };
    if (mode === "edit") {
      getListingDetails();
    }
  }, []);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFeatureChange = (name, value) => {
    setFeatures((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setOnSaveLoader(true);
    e.preventDefault();
    // console.log(formData)
    toast("Please Wait...");

    if (mode == "edit") {
      try {
        const result = await db
          .update(CarListing)
          .set({
            ...formData,
            features: featuresData,
            createdBy: user?.primaryEmailAddress.emailAddress,
            userName:user?.fullName,
            userImageUrl:user?.imageUrl,
            postedOn: moments().format("DD/MM/YYYY"),
          })
          .where(eq(CarListing.id, recordId))
          .returning({ id: CarListing.id });
        if (result) {
          setOnSaveLoader(false);
          navigate("/profile");
        }
      } catch (error) {
        setOnSaveLoader(false);
        console.log(error);
      }
    } else {
      try {
        const result = await db
          .insert(CarListing)
          .values({
            ...formData,
            features: featuresData,
            createdBy: user?.primaryEmailAddress.emailAddress,
            postedOn: moments().format("DD/MM/YYYY"),
          })
          .returning({ id: CarListing.id });
        if (result) {
          console.log(result);
          setTriggerUploadImages(result[0]?.id);
          setOnSaveLoader(false);
        }
      } catch (error) {
        setOnSaveLoader(false);
        console.log(error.message);
      }
    }
  };
  return (
    <div>
      <Header />
      <div className="px-10 my-10 md:px-20">
        <h2 className="font-bold text-4xl">Add New Listing</h2>
        <form onSubmit={handleSubmit} className="p-10 border rounded-xl mt-10">
          {/* Car Details */}
          <div>
            <h2 className="font-medium text-xl mb-6">Car Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {carDetails.carDetails.map((car, index) => (
                <div key={index}>
                  <label
                    className="text-sm flex gap-2 items-center mb-2"
                    htmlFor=""
                  >
                    <IconField icon={car?.icon} />
                    {car?.label}{" "}
                    {car.required && <span className="text-red-500">*</span>}
                  </label>
                  {car.fieldType === "text" || car.fieldType === "number" ? (
                    <InputField
                      item={car}
                      handleInputChange={handleInputChange}
                      carInfo={carInfo}
                    />
                  ) : car.fieldType === "dropdown" ? (
                    <DropDownField
                      item={car}
                      handleInputChange={handleInputChange}
                      carInfo={carInfo}
                    />
                  ) : car.fieldType === "textarea" ? (
                    <TextArea
                      item={car}
                      handleInputChange={handleInputChange}
                      carInfo={carInfo}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <Separator className="my-10" />
          <div>
            <h2 className="font-meduim text-xl my-6">Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {features.features.map((feature, index) => (
                <div key={index} className="flex  gap-2 items-center">
                  <Checkbox
                    checked={featuresData?.[feature.name]}
                    onCheckedChange={(value) =>
                      handleFeatureChange(feature.name, value)
                    }
                  />{" "}
                  <h2>{feature.name}</h2>
                </div>
              ))}
            </div>
          </div>
          <UploadImages
            triggerUploadImages={triggerUploadImages}
            carInfo={carInfo}
            mode={mode}
            setOnSaveLoader={(val) => {
              setOnSaveLoader(val);
              navigate("/profile");
            }}
          />

          <div className="mt-10 flex justify-end">
            <Button disabled={onSaveLoader} type="submit">
              {!onSaveLoader ? (
                "Submit"
              ) : (
                <BiLoaderAlt className="animate-spin text-lg" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddListing;
