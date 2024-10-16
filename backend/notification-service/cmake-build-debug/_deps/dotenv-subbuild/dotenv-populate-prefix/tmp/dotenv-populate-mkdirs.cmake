# Distributed under the OSI-approved BSD 3-Clause License.  See accompanying
# file Copyright.txt or https://cmake.org/licensing for details.

cmake_minimum_required(VERSION 3.5)

file(MAKE_DIRECTORY
  "/Users/negrutaadrian/Desktop/M2-SSE-AL-PADD/backend/notification-service/cmake-build-debug/_deps/dotenv-src"
  "/Users/negrutaadrian/Desktop/M2-SSE-AL-PADD/backend/notification-service/cmake-build-debug/_deps/dotenv-build"
  "/Users/negrutaadrian/Desktop/M2-SSE-AL-PADD/backend/notification-service/cmake-build-debug/_deps/dotenv-subbuild/dotenv-populate-prefix"
  "/Users/negrutaadrian/Desktop/M2-SSE-AL-PADD/backend/notification-service/cmake-build-debug/_deps/dotenv-subbuild/dotenv-populate-prefix/tmp"
  "/Users/negrutaadrian/Desktop/M2-SSE-AL-PADD/backend/notification-service/cmake-build-debug/_deps/dotenv-subbuild/dotenv-populate-prefix/src/dotenv-populate-stamp"
  "/Users/negrutaadrian/Desktop/M2-SSE-AL-PADD/backend/notification-service/cmake-build-debug/_deps/dotenv-subbuild/dotenv-populate-prefix/src"
  "/Users/negrutaadrian/Desktop/M2-SSE-AL-PADD/backend/notification-service/cmake-build-debug/_deps/dotenv-subbuild/dotenv-populate-prefix/src/dotenv-populate-stamp"
)

set(configSubDirs )
foreach(subDir IN LISTS configSubDirs)
    file(MAKE_DIRECTORY "/Users/negrutaadrian/Desktop/M2-SSE-AL-PADD/backend/notification-service/cmake-build-debug/_deps/dotenv-subbuild/dotenv-populate-prefix/src/dotenv-populate-stamp/${subDir}")
endforeach()
if(cfgdir)
  file(MAKE_DIRECTORY "/Users/negrutaadrian/Desktop/M2-SSE-AL-PADD/backend/notification-service/cmake-build-debug/_deps/dotenv-subbuild/dotenv-populate-prefix/src/dotenv-populate-stamp${cfgdir}") # cfgdir has leading slash
endif()
