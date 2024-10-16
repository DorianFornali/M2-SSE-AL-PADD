# Distributed under the OSI-approved BSD 3-Clause License.  See accompanying
# file Copyright.txt or https://cmake.org/licensing for details.

cmake_minimum_required(VERSION 3.5)

file(MAKE_DIRECTORY
  "/Users/negrutaadrian/Desktop/M2-SSE-AL-PADD/backend/notification-service/cmake-build-debug/_deps/cppdotenv-src"
  "/Users/negrutaadrian/Desktop/M2-SSE-AL-PADD/backend/notification-service/cmake-build-debug/_deps/cppdotenv-build"
  "/Users/negrutaadrian/Desktop/M2-SSE-AL-PADD/backend/notification-service/cmake-build-debug/_deps/cppdotenv-subbuild/cppdotenv-populate-prefix"
  "/Users/negrutaadrian/Desktop/M2-SSE-AL-PADD/backend/notification-service/cmake-build-debug/_deps/cppdotenv-subbuild/cppdotenv-populate-prefix/tmp"
  "/Users/negrutaadrian/Desktop/M2-SSE-AL-PADD/backend/notification-service/cmake-build-debug/_deps/cppdotenv-subbuild/cppdotenv-populate-prefix/src/cppdotenv-populate-stamp"
  "/Users/negrutaadrian/Desktop/M2-SSE-AL-PADD/backend/notification-service/cmake-build-debug/_deps/cppdotenv-subbuild/cppdotenv-populate-prefix/src"
  "/Users/negrutaadrian/Desktop/M2-SSE-AL-PADD/backend/notification-service/cmake-build-debug/_deps/cppdotenv-subbuild/cppdotenv-populate-prefix/src/cppdotenv-populate-stamp"
)

set(configSubDirs )
foreach(subDir IN LISTS configSubDirs)
    file(MAKE_DIRECTORY "/Users/negrutaadrian/Desktop/M2-SSE-AL-PADD/backend/notification-service/cmake-build-debug/_deps/cppdotenv-subbuild/cppdotenv-populate-prefix/src/cppdotenv-populate-stamp/${subDir}")
endforeach()
if(cfgdir)
  file(MAKE_DIRECTORY "/Users/negrutaadrian/Desktop/M2-SSE-AL-PADD/backend/notification-service/cmake-build-debug/_deps/cppdotenv-subbuild/cppdotenv-populate-prefix/src/cppdotenv-populate-stamp${cfgdir}") # cfgdir has leading slash
endif()
