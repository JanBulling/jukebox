"use client";

import { cn } from "@/utils";
import { Button } from "@/ui/button";
import { Icon } from "@/ui/icons";
import { Input } from "@/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

type Props = Omit<React.HTMLAttributes<HTMLDivElement>, "children"> & {
  initial?: string;
  forType?: "karaoke" | "jukebox";
};

const schema = z.object({
  q: z.string().min(3),
});
type FormData = z.infer<typeof schema>;

export function Searchbar({
  initial,
  forType = "jukebox",
  className,
  ...props
}: Props) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      q: initial,
    },
  });

  function onSubmit(data: FormData) {
    router.push(`/search?q=${data.q}&for=${forType}`);
    router.refresh();
    // window.location.reload();
  }

  return (
    <div className={cn("flex justify-center w-full", className)} {...props}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col w-full sm:w-[32rem] md:flex-row items-start h-max gap-2'
      >
        <div className='w-full'>
          <Input
            id='search'
            className='w-full'
            placeholder='Search Song on Spotify'
            autoComplete='off'
            icon={<Icon icon='Search' size={16} className='text-gray-500' />}
            {...register("q")}
            error={errors.q && "At least 3 characters"}
          />
        </div>
        <Button type='submit' className='w-full md:w-fit'>
          Search
        </Button>
      </form>
    </div>
  );
}
