<?php

namespace App\Controller;

use App\Entity\Course;
use App\Repository\CourseRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/courses')]
class CourseController extends AbstractController
{
    #[Route('', name: 'course_index', methods: ['GET'])]
    public function index(CourseRepository $courseRepository): Response
    {
        $courses = $courseRepository->findAll();
        return $this->render('course/index.html.twig', [
            'courses' => $courses,
        ]);
    }

    #[Route('/{id}', name: 'course_show', methods: ['GET'])]
    public function show(Course $course): Response
    {
        return $this->render('course/show.html.twig', [
            'course' => $course,
        ]);
    }

    #[Route('/new', name: 'course_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $em): Response
    {
        if ($request->isMethod('POST')) {
            $course = new Course();
            $course->setTitle($request->request->get('title'));
            $course->setCode($request->request->get('code'));
            $course->setDescription($request->request->get('description'));
            $course->setCredits((int)$request->request->get('credits'));
            $course->setCapacity((int)$request->request->get('capacity'));
            $course->setSemester($request->request->get('semester') ?: 'Fall');
            
            $em->persist($course);
            $em->flush();

            return $this->redirectToRoute('course_index');
        }

        return $this->render('course/new.html.twig');
    }

    #[Route('/{id}/edit', name: 'course_edit', methods: ['GET', 'POST'])]
    public function edit(Course $course, Request $request, EntityManagerInterface $em): Response
    {
        if ($request->isMethod('POST')) {
            $course->setTitle($request->request->get('title'));
            $course->setDescription($request->request->get('description'));
            $course->setCapacity((int)$request->request->get('capacity'));
            
            $em->flush();
            return $this->redirectToRoute('course_index');
        }

        return $this->render('course/edit.html.twig', [
            'course' => $course,
        ]);
    }

    #[Route('/{id}', name: 'course_delete', methods: ['POST'])]
    public function delete(Course $course, EntityManagerInterface $em): Response
    {
        $em->remove($course);
        $em->flush();

        return $this->redirectToRoute('course_index');
    }
}
