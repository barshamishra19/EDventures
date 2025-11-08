import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    category: {
      type: String,
      default: "General",
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],
    thumbnail: {
      type: String,
      default: "/images/default-course-thumbnail.png",
    },
    price: {
      type: Number,
      default: 0,
      min: 0,
    },
    published: {
      type: Boolean,
      default: false,
    },
    tags: [String],
    ratingsAverage: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    ratingsCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

// Text index for simple search and unique title per instructor
courseSchema.index({ title: "text", description: "text" });
courseSchema.index({ title: 1, instructor: 1 }, { unique: true });

// Simple slug generator: create from title and timestamp to avoid conflicts
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

courseSchema.pre("save", function (next) {
  if (this.isModified("title") || !this.slug) {
    const base = slugify(this.title || "course");
    // append timestamp to reduce chance of duplicate slug collisions
    this.slug = `${base}-${Date.now().toString().slice(-6)}`;
  }
  next();
});

// toJSON transform: add id, remove __v
courseSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model("Course", courseSchema);
