#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
  if (argc < 2) {
    fprintf(stderr, "Usage: %s <text>\n", argv[0]);
    return 1;
  }

  FILE *file = fopen("output.txt", "a");
  if (!file) {
    perror("fopen");
    return 1;
  }

  for (int i = 1; i < argc; i++) {
    fprintf(file, "%s", argv[i]);
    if (i < argc - 1) {
      fprintf(file, " ");
    }
  }

  fprintf(file, "\n");
  // fprintf(file, "%s", "hello world");
  // fclose(file);
  return 0;
}
