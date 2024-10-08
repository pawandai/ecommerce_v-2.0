import { buildConfig } from "payload/config";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import path from "path";
import { User } from "./models/Users";
import { Products } from "./models/Products/Products";
import { Media } from "./models/Media";
import { ProductFiles } from "./models/ProductFile";
import { Orders } from "./models/Orders";

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
  collections: [User, Products, Media, ProductFiles, Orders],
  routes: {
    admin: "/dashboard",
  },
  admin: {
    user: "users",
    bundler: webpackBundler(),
    meta: {
      titleSuffix: " | PawanDai",
      favicon: "/favicon.ico",
      // TODO: change the thumbnail image
      // ogImage: ''
    },
  },
  rateLimit: {
    max: 2000,
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
  }),
  typescript: {
    outputFile: path.resolve(__dirname, "payloadTypes.ts"),
  },
});
