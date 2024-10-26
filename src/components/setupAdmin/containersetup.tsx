"use client";
import { useEffect, useState, useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import * as z from "zod";
import { arrayUnion, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { useSession } from "next-auth/react";
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import StepTwo from "./steptwo";
import StepThree from "./stepthree";
import FinalStep from "./congo";
import Stepone from "./stepone";
import ShineBorder from "../ui/shine-border";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

// Define the vector model type
interface VectorModel {
  model: string;
  apiKey?: string; // Optional API Key
  endpointUrl?: string;
  region?: string;  // Optional region
  modelVersion?: string;
}
// Define the form schema using zod
const VectorModelSchema = z.object({
  apiKey: z.string().optional(), // Make it required
  region: z.string().optional(), // Optional
});

export default function SetupContainer() {
  const { data: session } = useSession();
  const [progress, setProgress] = useState(25);
  const [step, setStep] = useState(1);
  const [isModelConfigured, setIsModelConfigured] = useState(false);
  const [vectorModels, setVectorModels] = useState<VectorModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const [dataLoaderModels, setDataLoaderModels] = useState([]);
  const [embeddingModels, setEmbeddingModels] = useState([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  
  const form = useForm<z.infer<typeof VectorModelSchema>>({
    resolver: zodResolver(VectorModelSchema),
    defaultValues: {
      apiKey: "",
      region: "",
    },
  });

  // Fetch existing vector model on mount
  useEffect(() => {
    const fetchVectorModels = async () => {
        if (!session?.user?.id) return;

        const adminRef = doc(db, "admins", session.user.id);
        const adminSnap = await getDoc(adminRef);

        if (adminSnap.exists()) {
            const data = adminSnap.data();
            // Ensure vectorModels is safely accessed
            if (data.vectorModels?.length > 0) {
                setIsModelConfigured(true);
                setVectorModels(data.vectorModels);
            }
        }
    };

    fetchVectorModels();
}, [session]);


const onSubmit: SubmitHandler<z.infer<typeof VectorModelSchema>> = async (data) => {
  // Clear previous messages
  setError("");
  setSuccess("");

  if (!session?.user?.id) return;

  const adminRef = doc(db, "admins", session.user.id);

  startTransition(async () => {
    try {
      // Define the type for the model data
      type ModelData = {
        apiKey?: string;
        region?: string;
        storage: string | null; // Selected model
      };

      // Prepare the data to save based on the selected model
      const modelData: ModelData = {
        storage: selectedModel, // Store the selected model here
      };

      // Only include API key and region if necessary (not for Chroma)
      if (selectedModel === "Pinecone") {
        modelData.apiKey = data.apiKey || undefined;
        modelData.region = data.region || undefined; // Include region only if Pinecone is selected
      }

      // Save the vector model data in the Firebase database (Admin Credentials)
      await updateDoc(adminRef, {
        vectorModels: arrayUnion(modelData),
      });

      setSuccess("Vector Index configured successfully!");
      setIsModelConfigured(true);
    } catch (error) {
      setError("An error occurred while configuring the model.");
      console.error("Error updating document: ", error);
    }
  });
};

  const handleDeleteModel = async () => {
    if (!session?.user?.id) return;

    const adminRef = doc(db, "admins", session.user.id);

    // Clear the entire vectorModels array
    await updateDoc(adminRef, {
      vectorModels: [],
    });

    // Update the local state to reflect the deletion
    setVectorModels([]); // Reset vector models after deletion
    setIsModelConfigured(false); // Mark the model as not configured
    setSelectedModel(null); // Clear the selected model
  };

  const handleNextStep = () => {
    setStep(step + 1);
    setProgress(progress + 25);
  };
  const handleBackStep = () => {
    setStep(step - 1);
    setProgress(progress - 25);
  };
  const handleReset = () => {
    setStep(1);
    setProgress(25);
    setIsModelConfigured(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.id) return;

      const adminRef = doc(db, "admins", session.user.id);
      const adminSnap = await getDoc(adminRef);

      if (adminSnap.exists()) {
        const data = adminSnap.data();
        
        // Set the user info
        setEmail(data.email);
        setName(data.name);
        setProfileImage(data.profileImage);

        // Set models
        setVectorModels(data.vectorModels || []);
        setEmbeddingModels(data.embeddingModels || []);
        setDataLoaderModels(data.dataLoaderModels || []);
      }
    };

    fetchData();
  }, [session]);

  useEffect(() => {
    if (session) {
      // Load existing models from session data
      const user = session.user;
      setVectorModels(user.vectorModels || []);
      setEmbeddingModels(user.embeddingModels || []);
      setDataLoaderModels(user.dataLoaderModels || []);
    }
  }, [session]);
  return (
      <ShineBorder className="w-[90rem] bg-muted dark:bg-muted p-8 shadow-md dark:text-black rounded-lg relative" color={["white", "#d3d4d3", "black"]}>
        <div className="absolute top-0 left-0 right-0 p-4">
          <Progress value={progress} />
        </div>
        {step === 1 ? (
          <Stepone onNext={handleNextStep} step={step} />
        ): step === 2 ? (
          <div className="flex flex-row w-[85rem] h-[50rem]" >
            <div className="flex flex-col mt-[5rem] min-h-[50rem] w-[20rem] space-y-4">
              <Button variant="outline" className={step === 2 ? "px-8 py-0.5 dark:bg-black dark:text-white  border-2 border-black dark:border-white uppercase bg-white text-black transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)]" : ""}>
                Vector Index
              </Button>
              <Button variant="outline" className="text-white px-8 py-0.5 border-white" disabled={isModelConfigured}>
              Embedding Models
        </Button>
        <Button variant="outline" disabled={isModelConfigured} className="text-white border-white px-8 py-0.5">
        Data Loaders
        </Button>
            </div>

            <div className="flex-1 bg-gray-100 dark:bg-muted p-8 rounded-lg ml-4">
              <h3 className="text-2xl mb-4 pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-400 bg-clip-text text-center font-semibold leading-none text-transparent dark:from-white dark:to-[#928a92]">Choose a Vector Index</h3>
              <div className="grid grid-cols-3 gap-5">
                {["Pinecone", "Faiss", "Chroma"].map((model) => (
                  <div key={model}>
                    <Dialog>
                    <DialogTrigger asChild>
    <div onClick={() => setSelectedModel(model)}>
      <CardContainer>  
        <CardBody
          className={`bg-white mt-5 w-[20rem] h-[20rem] group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] shadow-lg rounded-lg flex flex-col justify-center items-center cursor-pointer border border-gray-300 ${isModelConfigured ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {/* Card Image */}
          <CardItem
            translateZ="100"
            rotateX={20}
            rotateZ={-10}
            className="w-full mt-4"
            style={{ width: '100%', height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}
          >
            <Image
              src={`/vect/${model.toLowerCase()}.png`}
              alt={model}
              className="object-contain" 
              width={100}
              height={100}
              style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '8px' }}
            />
          </CardItem>

          {/* Card Title */}
          <CardItem
            as="p"
            translateZ="60"
            className="text-center mt-4 text-2xl border-t-2 border-black w-[50%] font-semibold"
          >
            {model}
          </CardItem>
        </CardBody>
      </CardContainer>
    </div>
  </DialogTrigger>

                      <DialogContent>
  <DialogHeader>
    <DialogTitle>{`Configure ${model}`}</DialogTitle>
  </DialogHeader>
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-4">
      {(selectedModel === "Pinecone" || selectedModel === "Faiss")&& (
        <FormField
          control={form.control}
          name="apiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter API Key</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isPending}
                  placeholder="********"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

        {/* Conditionally render the Region field only for Pinecone */}
        {selectedModel === "Pinecone" && (
          <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Vector Index</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="India"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
              {selectedModel === "Chroma" && (
          <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Vector Index</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="India"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
             
      </div>
             
                          <div className="mt-4">
                          <FormError message={error} />
                          <FormSuccess message={success} />
                          <Button onClick={handleBackStep}  variant="outline">Back</Button>

                            <Button type="submit" variant="outline" disabled={isModelConfigured}>
                              Submit
                            </Button>
                          </div>
                        </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                  </div>
                ))}
              </div>

              {isModelConfigured && (
                <div className="mt-4">
                  <Button onClick={handleDeleteModel} variant="default" className="  px-8 py-2 dark:shadow-white rounded-md border hover:bg-red-500 bg-red-500 border-black  dark:text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 text-black">
                    Reset Vector Model
                  </Button>
                </div>
              )}

              <div className="mt-4 flex flex-row justify-between">
              <Button onClick={handleBackStep}  variant="outline" className="px-8 py-2 dark:shadow-white rounded-md border bg-white border-black dark:bg-white dark:text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 text-black">Back</Button>

                <Button onClick={handleNextStep} variant="outline" className="  px-8 py-2 dark:shadow-white  rounded-md border bg-white border-black dark:bg-white dark:text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 text-black" disabled={!isModelConfigured}>
                  Next
                </Button>
              </div>
            </div>
          </div>
        ) : step === 3 ? (
          <StepTwo onBack={handleBackStep} onNext={handleNextStep} step={step} />
        ) : step === 4 ? (
          <StepThree onBack={handleBackStep} onNext={handleNextStep} step={step} />
        ): (
          <FinalStep
            onReset={handleReset}
            email={session?.user?.email || ''}
            name={session?.user?.name || ''}
            profileImage={session?.user?.profileImage || ''}
            vectorModels={vectorModels}
            embeddingModels={embeddingModels}
            dataLoaderModels={dataLoaderModels}
          />
        )}
      </ShineBorder>
  );
}
