"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createOngFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, LoaderCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { createOng } from "@/actions/ongActions";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { Textarea } from "./ui/textarea";

export const CreateOngForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const { data, status } = useSession();

  const form = useForm<z.infer<typeof createOngFormSchema>>({
    resolver: zodResolver(createOngFormSchema),
    defaultValues: {
      name: "",
      email: "",
      description: "",
      address: "",
      phone: "",
      category: "",
      image: {
        url: "",
        id: "",
      },
      site: "",
      instagram: "",
      voluntary: "",
      itens: "",
    },
  });

  const deleteImageInCloudinary = () => {
    const imageId = form.getValues("image.id");

    const data = {
      imageId: imageId,
    };

    fetch(`/api/sign-cloudinary-params`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
    }).then(() => {
      form.setValue("image.url", "");
      form.setValue("image.id", "");
      setImageUrl("");

      toast("Imagem removida", {
        style: { backgroundColor: "#07bc0c", color: "#000" },
      });
    });
  };

  const onSubmit = (values: z.infer<typeof createOngFormSchema>) => {
    setIsLoading(true);

    const userId = data?.user.id || "";

    createOng(values, userId)
      .then((response) => {
        location.replace("/"); // Redirecionar para a home
        toast(response, {
          style: { backgroundColor: "#07bc0c", color: "#000" },
        });
      })
      .catch((error) => {
        toast(error.message, {
          style: { backgroundColor: "#e74c3c", color: "#000" },
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <main className="grow flex items-center justify-center py-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="border space-y-4 p-4 rounded-md w-full max-w-lg"
        >
          <h1 className="font-bold text-2xl text-center">Criar ONG</h1>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome:</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  Nome da ong
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email:</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormDescription className="sr-only">Email</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição:</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription className="sr-only">Descrição</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereço:</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormDescription className="sr-only">Endereço</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone:</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormDescription className="sr-only">Telefone</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categória:</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormDescription className="sr-only">Categória</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Escolha uma imagem:</FormLabel>
                <FormControl>
                  <CldUploadWidget
                    signatureEndpoint="/api/sign-cloudinary-params"
                    onSuccess={({ info }) => {
                      // Verifica se info é um objeto com a propriedade secure_url (corrige erro do TS não reconhece secure_url e secure_id)
                      if (
                        typeof info === "object" &&
                        info?.secure_url &&
                        info?.public_id
                      ) {
                        const imageUrl = info.secure_url;
                        const imageId = info.public_id;

                        form.setValue("image.url", imageUrl);
                        form.setValue(`image.id`, imageId);
                        setImageUrl(imageUrl);
                      } else {
                        console.error(
                          "Erro: O resultado retornado não contém os dados esperados."
                        );
                      }
                    }}
                    options={{
                      maxFiles: 1, // Só 1 imagem pode ser enviada por vez
                      sources: ["local", "google_drive"], // Somente imagens locais (no computador) e imagens do google drive podem ser enviadas
                      clientAllowedFormats: ["jpg", "jpeg", "webp", "png"], // Formatos aceitáveis
                      maxImageFileSize: 5000000, // 5MB é o tamanho máximo da imagem
                      autoMinimize: true, // Minimiza a tela de enviar imagens quando uma imagem sofrer upload, assim evita o usuário enviar múltiplas imagens
                    }}
                  >
                    {({ open }) => {
                      return (
                        <>
                          {imageUrl ? (
                            <div className="flex items-center gap-4">
                              <div className="border-dashed border-2 border-slate-300 rounded-md h-24 overflow-hidden relative w-full max-w-48">
                                <Image
                                  src={imageUrl}
                                  alt="teste"
                                  fill
                                  className="w-full h-full object-fill"
                                />
                              </div>

                              <Button
                                size={"lg"}
                                variant={"destructive"}
                                type="button"
                                onClick={deleteImageInCloudinary}
                                className="cursor-pointer"
                              >
                                <Trash2 />
                              </Button>
                            </div>
                          ) : (
                            <>
                              <Button
                                variant={"ghost"}
                                size={"lg"}
                                type="button"
                                onClick={() => open()}
                                className="border-dashed border-2 border-slate-300 w-full max-w-48 h-24 cursor-pointer"
                              >
                                <Camera />
                              </Button>
                            </>
                          )}
                        </>
                      );
                    }}
                  </CldUploadWidget>
                </FormControl>
                <FormDescription className="sr-only">
                  Escolha uma imagem
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="site"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Site URL (opcional):</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormDescription className="sr-only">Site</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="instagram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instagram (opcional):</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormDescription className="sr-only">Instagram</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="voluntary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Voluntários (opcional):</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  Voluntários
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="itens"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Itens em falta (opcional):</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  Itens em falta
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {isLoading ? (
            <Button
              size={"lg"}
              type="button"
              disabled
              className="w-full bg-blue-400 text-black hover:bg-blue-600 focus-visible:bg-blue-600"
            >
              <LoaderCircle className="animate-spin" />
              Carregando...
            </Button>
          ) : (
            <Button
              size={"lg"}
              type="submit"
              className="cursor-pointer w-full bg-blue-400 text-black hover:bg-blue-600 focus-visible:bg-blue-600"
            >
              Criar ONG
            </Button>
          )}
        </form>
      </Form>
    </main>
  );
};
