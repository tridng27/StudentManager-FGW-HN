<?php

namespace App\Controller;

use App\Entity\Enrollment;
use App\Repository\EnrollmentRepository;
use App\Repository\StudentRepository;
use App\Repository\CourseRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/enrollments')]
class EnrollmentController extends AbstractController
{
    #[Route('', name: 'enrollment_index', methods: ['GET'])]
    public function index(EnrollmentRepository $enrollmentRepository): Response
    {
        $enrollments = $enrollmentRepository->findAll();
        return $this->render('enrollment/index.html.twig', [
            'enrollments' => $enrollments,
        ]);
    }

    #[Route('/new', name: 'enrollment_new', methods: ['GET', 'POST'])]
    public function new(
        Request $request,
        EntityManagerInterface $em,
        StudentRepository $studentRepository,
        CourseRepository $courseRepository
    ): Response
    {
        if ($request->isMethod('POST')) {
            $studentId = $request->request->get('student_id');
            $courseId = $request->request->get('course_id');
            
            $student = $studentRepository->find($studentId);
            $course = $courseRepository->find($courseId);
            
            if (!$student || !$course) {
                throw $this->createNotFoundException('Student or Course not found');
            }

            $enrollment = new Enrollment();
            $enrollment->setStudent($student);
            $enrollment->setCourse($course);
            $enrollment->setStatus('enrolled');
            
            $em->persist($enrollment);
            $em->flush();

            return $this->redirectToRoute('enrollment_index');
        }

        return $this->render('enrollment/new.html.twig', [
            'students' => $studentRepository->findActiveStudents(),
            'courses' => $courseRepository->findAll(),
        ]);
    }

    #[Route('/{id}/drop', name: 'enrollment_drop', methods: ['POST'])]
    public function drop(Enrollment $enrollment, EntityManagerInterface $em): Response
    {
        $em->remove($enrollment);
        $em->flush();

        return $this->redirectToRoute('enrollment_index');
    }
}
