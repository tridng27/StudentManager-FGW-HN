<?php

namespace App\Repository;

use App\Entity\Enrollment;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Enrollment>
 */
class EnrollmentRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Enrollment::class);
    }

    public function findByStudent($student)
    {
        return $this->findBy(['student' => $student]);
    }

    public function findByCourse($course)
    {
        return $this->findBy(['course' => $course]);
    }

    public function findEnrolledStudentsForCourse($course)
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.course = :course')
            ->andWhere('e.status = :status')
            ->setParameter('course', $course)
            ->setParameter('status', 'enrolled')
            ->getQuery()
            ->getResult();
    }
}
