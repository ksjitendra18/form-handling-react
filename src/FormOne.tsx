import { FormEvent, useEffect, useState } from "react";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(5, { message: "Name must be more than 5 characters" })
    .max(50, { message: "Name must be less than 50 characters" })
    .trim(),

  description: z
    .string({ required_error: "Description is required" })
    .min(10, { message: "Description must be more than 10 characters" })
    .max(150, { message: "Description must be less than 150 characters" })

    .trim(),

  price: z.coerce
    .number({ required_error: "Price is required" })
    .min(0, { message: "Price should be more than 0" }),

  category: z
    .string({ required_error: "Category is required" })
    .refine((val) => val !== "uncategorised", {
      message: "Choose category other than uncategorised",
    }),

  is_featured: z.boolean(),
});

type FormSchema = z.infer<typeof formSchema>;
const FormOne = () => {
  const [formData, setFormData] = useState<z.infer<typeof formSchema>>({
    name: "",
    description: "",
    price: 0,
    is_featured: false,
    category: "",
  });

  const [formError, setFormError] =
    useState<z.ZodFormattedError<FormSchema, string>>();

  const [touchedInput, setTouchedInput] = useState<string[]>([]);

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (!touchedInput.includes(event.target.name)) {
      setTouchedInput([...touchedInput, event.target.name]);
    }

    if (event.target.type === "checkbox") {
      if (event.target && event.target instanceof HTMLInputElement) {
        setFormData({
          ...formData,
          [event.target.name]: event.target.checked,
        });
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    }
  };

  useEffect(() => {
    const parsedData = formSchema.safeParse(formData);

    if (!parsedData.success) {
      const err = parsedData.error.format();
      setFormError(err);
    }
  }, [formData]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const parsedFormValue = formSchema.safeParse(formData);

      if (!parsedFormValue.success) {
        const err = parsedFormValue.error.format();

        setFormError(err);
        return;
      }

      // send data to database
      console.log("formdata", parsedFormValue);
    } catch (error) {
      console.log("caught error");
      //handle additional erros ...
    }
  };

  return (
    <>
      <div className="my-10 w-full">
        <h2 className="text-2xl text-center font-bold">Add New</h2>
        <form onSubmit={handleSubmit} className="lg:w-1/2 mx-auto px-5 py-5">
          <label className=" block" htmlFor="name">
            Product Name
          </label>
          <input
            type="text"
            min={2}
            max={50}
            className="border-2 mb-2 border-gray-500  focus-visible:border-0 focus-visible:outline-2  rounded-md px-3 py-2 w-full"
            onChange={(event) => handleInputChange(event)}
            name="name"
            id="text"
            required
          />
          {touchedInput.includes("name") && formError?.name && (
            <>
              {formError?.name?._errors.map((err) => (
                <p className="text-red-500 mb-2" key={err}>
                  {err}
                </p>
              ))}
            </>
          )}

          <label className="block" htmlFor="description">
            Product Description
          </label>
          <textarea
            minLength={10}
            maxLength={150}
            rows={5}
            className="border-2 mb-2 border-gray-500  focus-visible:border-0 focus-visible:outline-2  rounded-md px-3 py-2 w-full"
            name="description"
            id="description"
            onChange={(event) => handleInputChange(event)}
            required
          />
          {touchedInput.includes("description") && formError?.description && (
            <>
              {formError?.description?._errors?.map((err) => (
                <p className="text-red-500 mb-2" key={err}>
                  {err}
                </p>
              ))}
            </>
          )}
          <label className="block" htmlFor="price">
            Product Price
          </label>
          <input
            className="border-2 mb-2 border-gray-500  focus-visible:border-0 focus-visible:outline-2  rounded-md px-3 py-2 w-full"
            type="number"
            name="price"
            min={0}
            id="price"
            onChange={(event) => handleInputChange(event)}
            required
          />
          {touchedInput.includes("price") && formError?.name && (
            <>
              {formError?.price?._errors?.map((err) => (
                <p className="text-red-500 mb-2" key={err}>
                  {err}
                </p>
              ))}
            </>
          )}

          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            className=" border bg-[#f8f8f8] border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2  "
            onChange={(event) => handleInputChange(event)}
          >
            <option value="uncategorised">Choose a category</option>
            <option value="shirts">Shirts</option>
            <option value="pants">Pants </option>
            <option value="glasses">Glasses</option>
            <option value="hats">Hats</option>
          </select>

          {touchedInput.includes("category") && formError?.name && (
            <>
              {formError?.category?._errors?.map((err) => (
                <p className="text-red-500 mb-2" key={err}>
                  {err}
                </p>
              ))}
            </>
          )}

          <label className="my-3 inline-block" htmlFor="is_featured">
            Featured Product
          </label>
          <input
            id="is_featured"
            name="is_featured"
            className="ml-5"
            type="checkbox"
            onChange={(event) => handleInputChange(event)}
          />
          <div className="flex justify-end">
            <button className=" bg-blue-500 hover:scale-95 transition-all duration-75 ease-in px-5 py-2 rounded-md text-white">
              Add New Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormOne;
