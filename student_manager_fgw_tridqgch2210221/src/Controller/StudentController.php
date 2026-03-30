<?php

namespace App\Controller;

use App\Entity\Student;
use App\Repository\StudentRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/students')]
class StudentController extends AbstractController
{
    #[Route('', name: 'student_index', methods: ['GET'])]
    public function index(StudentRepository $studentRepository): Response
    {
        $students = $studentRepository->findActiveStudents();
        return $this->render('student/index.html.twig', [
            'students' => $students,
        ]);
    }

    #[Route('/{id}', name: 'student_show', methods: ['GET'])]
    public function show(Student $student): Response
    {
        return $this->render('student/show.html.twig', [
            'student' => $student,
        ]);
    }

    #[Route('/new', name: 'student_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $em): Response
    {
        if ($request->isMethod('POST')) {
            $student = new Student();
            $student->setFirstName($request->request->get('firstName'));
            $student->setLastName($request->request->get('lastName'));
            $student->setStatus('active');
            
            $em->persist($student);
            $em->flush();

            return $this->redirectToRoute('student_index');
        }

        return $this->render('student/new.html.twig');
    }

    #[Route('/{id}/edit', name: 'student_edit', methods: ['GET', 'POST'])]
    public function edit(Student $student, Request $request, EntityManagerInterface $em): Response
    {
        if ($request->isMethod('POST')) {
            $student->setFirstName($request->request->get('firstName'));
            $student->setLastName($request->request->get('lastName'));
            
            $em->flush();
            return $this->redirectToRoute('student_index');
        }

        return $this->render('student/edit.html.twig', [
            'student' => $student,
        ]);
    }

    #[Route('/{id}', name: 'student_delete', methods: ['POST'])]
    public function delete(Student $student, EntityManagerInterface $em): Response
    {
        $em->remove($student);
        $em->flush();

        return $this->redirectToRoute('student_index');
    }
}
