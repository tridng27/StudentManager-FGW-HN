<?php

namespace App\Controller;

use App\Entity\Grade;
use App\Repository\GradeRepository;
use App\Repository\StudentRepository;
use App\Repository\CourseRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/grades')]
class GradeController extends AbstractController
{
    #[Route('', name: 'grade_index', methods: ['GET'])]
    public function index(GradeRepository $gradeRepository): Response
    {
        $grades = $gradeRepository->findAll();
        return $this->render('grade/index.html.twig', [
            'grades' => $grades,
        ]);
    }

    #[Route('/student/{id}', name: 'grade_by_student', methods: ['GET'])]
    public function byStudent($id, GradeRepository $gradeRepository, StudentRepository $studentRepository): Response
    {
        $student = $studentRepository->find($id);
        $grades = $gradeRepository->findByStudent($student);
        $gpa = $gradeRepository->calculateStudentGPA($student);
        
        return $this->render('grade/student.html.twig', [
            'student' => $student,
            'grades' => $grades,
            'gpa' => $gpa,
        ]);
    }

    #[Route('/new', name: 'grade_new', methods: ['GET', 'POST'])]
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
            $score = (int)$request->request->get('score');
            
            $student = $studentRepository->find($studentId);
            $course = $courseRepository->find($courseId);
            
            if (!$student || !$course) {
                throw $this->createNotFoundException('Student or Course not found');
            }

            $grade = new Grade();
            $grade->setStudent($student);
            $grade->setCourse($course);
            $grade->setScore($score);
            
            $em->persist($grade);
            $em->flush();

            return $this->redirectToRoute('grade_index');
        }

        return $this->render('grade/new.html.twig', [
            'students' => $studentRepository->findActiveStudents(),
            'courses' => $courseRepository->findAll(),
        ]);
    }
}
