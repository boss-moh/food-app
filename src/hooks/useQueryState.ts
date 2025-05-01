// 'use client'
// import { usePathname, useSearchParams } from "next/navigation";
// import { useRouter } from "next/router";
// import { useState } from "react";

// export const useQueryState = <T>(
//   key:string,
//   initialState: T,
// ) => {
//   const searchParams = useSearchParams();
//   const path = usePathname();
//   const router = useRouter();

//   const [state, setState] = useState(
//     () => initialState || searchParams.get(key)
//   );

//   const changeValue = (value: T) => {
//     const params = new URLSearchParams(searchParams)
//     if (state) {
//             params.set(key, value);
//           } else {
//             params.delete(key);
//           }
//     router.replace(`${path}?${params.toString()}`)
//   }

//   // useEffect(() => {
//   //   const time = setTimeout(() => {
//   //     const params = new URLSearchParams(searchParams);

//   //     if (searchTerm) {
//   //       params.set("query", searchTerm.toLowerCase());
//   //     } else {
//   //       params.delete("query");
//   //     }

//   //     router.replace(`${path}?${params.toString()}`);
//   //   }, 500);
//   //   return () => clearTimeout(time);
//   // }, [searchTerm, path, router, searchParams]);

// }
