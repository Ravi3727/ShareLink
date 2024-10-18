import { z } from 'zod';

// URL validation patterns
const urlPatterns = {
  youtube: /^https?:\/\/(www\.)?youtube\.com\/.+$/,
  facebook: /^https?:\/\/(www\.)?facebook\.com\/.+$/,
  github: /^https?:\/\/(www\.)?github\.com\/.+$/,
  linkedIn: /^https?:\/\/(www\.)?linkedin\.com\/.+$/,
  frontendMentor: /^https?:\/\/(www\.)?frontendmentor\.io\/.+$/,
};

// Zod schema to validate based on platform
export const linkSchema = z.object({
  title: z.string()
    .min(2, "Title must be at least 2 characters")
    .max(50, "Title must be at most 50 characters"),
  
  url: z.string().refine((url, { parent }) => {
    const platform = parent.title; // Get the platform name from the parent object

    // Platform-specific validation logic
    if (platform === 'YouTube') return urlPatterns.youtube.test(url);
    if (platform === 'Facebook') return urlPatterns.facebook.test(url);
    if (platform === 'GitHub') return urlPatterns.github.test(url);
    if (platform === 'LinkedIn') return urlPatterns.linkedIn.test(url);
    if (platform === 'Frontend Mentor') return urlPatterns.frontendMentor.test(url);

    return false; // Default to invalid if platform is not matched
  }, {
    message: "Invalid URL for the selected platform.",
  }),
});
