<?php

namespace App\Repository;

use App\Entity\Course;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Course>
 */
class CourseRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Course::class);
    }

    public function findBySemester(string $semester)
    {
        return $this->findBy(['semester' => $semester]);
    }

    public function findByCode(string $code): ?Course
    {
        return $this->findOneBy(['code' => $code]);
    }

    public function findAvailableCourses()
    {
        return $this->createQueryBuilder('c')
            ->where('c.capacity > :zero')
            ->setParameter('zero', 0)
            ->orderBy('c.title', 'ASC')
            ->getQuery()
            ->getResult();
    }
}
