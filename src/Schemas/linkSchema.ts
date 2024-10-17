import { z } from 'zod';

const urlPatterns = {
  youtube: /^https?:\/\/(www\.)?youtube\.com\/.+$/,
  facebook: /^https?:\/\/(www\.)?facebook\.com\/.+$/,
  github: /^https?:\/\/(www\.)?github\.com\/.+$/,
  linkedIn: /^https?:\/\/(www\.)?linkedin\.com\/.+$/,
  frontendMentor: /^https?:\/\/(www\.)?frontendmentor\.io\/.+$/,
};

export const linkInSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(50, "Title must be at most 50 characters"),
  
  url: z.string().refine((url) => {
    return (
      urlPatterns.youtube.test(url) ||
      urlPatterns.facebook.test(url) ||
      urlPatterns.github.test(url) ||
      urlPatterns.linkedIn.test(url) ||
      urlPatterns.frontendMentor.test(url)
    );
  }, {
    message: "Invalid URL. Please provide a valid YouTube, Facebook, GitHub, LinkedIn, or Frontend Mentor URL."
  }),
});
