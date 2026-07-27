# Course Details Integration - Implementation Steps

## Step 1: Add `slug` to `CourseItem` in `courses.data.ts`
- Add `slug: string` field to interface
- Add Arabic URL slugs to all 8 courses

## Step 2: Update `CourseButton.tsx`
- Accept `slug: string` prop
- Use `<Link>` from react-router-dom for navigation to `/courses/${slug}`

## Step 3: Update `CourseCard.tsx`
- Pass `course.slug` to `<CourseButton slug={course.slug} />`

## Step 4: Enrich `course.mock.ts` with courses 5-8
- Add full `CourseDetail` data for courses 5-8

## Step 5: Update route from `courses/:id` to `courses/:slug`
- In `router/index.tsx`

## Step 6: Build complete `CourseDetailsPage.tsx`
- useParams() to read :slug
- getCourseBySlug() to load course
- 404 page for invalid slugs
- All sections: Hero, Preview, Objectives, Curriculum, Features, Teacher, Reviews, FAQ, CTA

## Step 7: Fix broken JSX in `CoursePreview.tsx`
- Add missing `<motion.button` opening tag

## Step 8: Build, run, and verify all 8 courses work
- Run `npm run dev`
- Click every "عرض التفاصيل" button
- Verify correct data loads for each course

