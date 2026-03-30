<?php

namespace App\Repository;

use App\Entity\Grade;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Grade>
 */
class GradeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Grade::class);
    }

    public function findByStudent($student)
    {
        return $this->findBy(['student' => $student]);
    }

    public function findByCourse($course)
    {
        return $this->findBy(['course' => $course]);
    }

    public function calculateStudentGPA($student): float
    {
        $grades = $this->findByStudent($student);
        if (empty($grades)) {
            return 0.0;
        }

        $total = 0;
        $count = 0;
        foreach ($grades as $grade) {
            $total += $grade->getScore();
            $count++;
        }

        return $count > 0 ? round($total / $count, 2) : 0.0;
    }
}
