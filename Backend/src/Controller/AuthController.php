<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

final class AuthController extends AbstractController
{
    // #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    // public function index(#[CurrentUser] ?User $user): JsonResponse
    // {
    //     if (null === $user) {
    //         return $this->json([
    //             'message' => 'missing credentials',
    //         ], JsonResponse::HTTP_UNAUTHORIZED);
    //     }

    //     $token = "..."; // somehow create an API token for $user

    //     return $this->json([
    //         'user'  => $user->getUserIdentifier(),
    //         'token' => $token,
    //     ]);
    // }
    #[Route('/logout', name: 'app_logout')]
    public function logout(): void
    {
        throw new \LogicException(
            'This method can be blank: it will be intercepted by the logout key on your firewall.'
        );
    }

    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function register(
        Request $request,
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        if (!is_array($data)) {
            return $this->json([
                'error' => 'Invalid JSON request.'
            ], JsonResponse::HTTP_BAD_REQUEST);
        }

        $email = trim($data['email'] ?? '');
        $plainPassword = $data['password'] ?? '';

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return $this->json([
                'error' => 'A valid email is required.'
            ], JsonResponse::HTTP_BAD_REQUEST);
        }

        if (!is_string($plainPassword) || strlen($plainPassword) < 8) {
            return $this->json([
                'error' => 'Password must be at least 8 characters.'
            ], JsonResponse::HTTP_BAD_REQUEST);
        }

        $existingUser = $entityManager
            ->getRepository(User::class)
            ->findOneBy(['email' => $email]);

        if ($existingUser) {
            return $this->json([
                'error' => 'Email already registered.'
            ], JsonResponse::HTTP_CONFLICT);
        }

        $user = new User();
        $user->setEmail($email);
        $user->setPassword(
            $passwordHasher->hashPassword($user, $plainPassword)
        );

        // Never accept roles from public registration requests.
        $user->setRoles(['ROLE_USER']);

        $entityManager->persist($user);
        $entityManager->flush();

        return $this->json([
            'message' => 'Registration successful.',
            'user' => [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
            ],
        ], JsonResponse::HTTP_CREATED);
    }
}
